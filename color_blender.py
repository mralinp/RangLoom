import tkinter as tk
from tkinter import ttk, filedialog
import cv2
import numpy as np
from scipy.optimize import minimize
from PIL import Image, ImageTk

class ColorBlender:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Color Blender")
        self.base_colors = []
        self.target_color = None
        self.current_image = None
        self.camera = None
        self.setup_ui()

    def setup_ui(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Source selection
        ttk.Label(main_frame, text="Select Source:").grid(row=0, column=0, pady=5)
        ttk.Button(main_frame, text="Load Image", command=self.load_image).grid(row=0, column=1, padx=5)
        ttk.Button(main_frame, text="Use Camera", command=self.start_camera).grid(row=0, column=2, padx=5)

        # Image display
        self.image_label = ttk.Label(main_frame)
        self.image_label.grid(row=1, column=0, columnspan=3, pady=10)

        # Selected colors frame
        colors_frame = ttk.LabelFrame(main_frame, text="Selected Colors (3-5)", padding="5")
        colors_frame.grid(row=2, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        self.color_labels = []
        for i in range(5):
            label = ttk.Label(colors_frame, width=10, background='white')
            label.grid(row=0, column=i, padx=2)
            self.color_labels.append(label)

        # Target color frame
        target_frame = ttk.LabelFrame(main_frame, text="Target Color", padding="5")
        target_frame.grid(row=3, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))
        self.target_label = ttk.Label(target_frame, width=10, background='white')
        self.target_label.grid(row=0, column=0, padx=2)

        # Control buttons
        ttk.Button(main_frame, text="Calculate Blend", command=self.calculate_blend).grid(row=4, column=0, columnspan=3, pady=5)

        # Results frame
        self.results_frame = ttk.LabelFrame(main_frame, text="Results", padding="5")
        self.results_frame.grid(row=5, column=0, columnspan=3, pady=5, sticky=(tk.W, tk.E))

    def rgb_to_cmyk(self, rgb):
        rgb_norm = np.array(rgb) / 255.0
        k = 1 - np.max(rgb_norm)
        if k < 1:
            c = (1 - rgb_norm[0] - k) / (1 - k)
            m = (1 - rgb_norm[1] - k) / (1 - k)
            y = (1 - rgb_norm[2] - k) / (1 - k)
        else:
            c = m = y = 0
        return (c, m, y, k)

    def cmyk_to_rgb(self, cmyk):
        c, m, y, k = cmyk
        r = 255 * (1 - c) * (1 - k)
        g = 255 * (1 - m) * (1 - k)
        b = 255 * (1 - y) * (1 - k)
        return (int(r), int(g), int(b))

    def load_image(self):
        file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp")])
        if file_path:
            self.stop_camera()
            self.current_image = cv2.imread(file_path)
            self.show_image()

    def start_camera(self):
        self.camera = cv2.VideoCapture(0)
        self.update_camera()

    def stop_camera(self):
        if self.camera is not None:
            self.camera.release()
            self.camera = None

    def update_camera(self):
        if self.camera is not None:
            ret, frame = self.camera.read()
            if ret:
                self.current_image = frame
                self.show_image()
            self.root.after(10, self.update_camera)

    def show_image(self):
        if self.current_image is not None:
            image = cv2.cvtColor(self.current_image, cv2.COLOR_BGR2RGB)
            image = cv2.resize(image, (640, 480))
            photo = ImageTk.PhotoImage(image=Image.fromarray(image))
            self.image_label.configure(image=photo)
            self.image_label.image = photo
            self.image_label.bind('<Button-1>', self.on_image_click)

    def on_image_click(self, event):
        if self.current_image is None:
            return

        # Convert click coordinates to image coordinates
        x = int(event.x * self.current_image.shape[1] / 640)
        y = int(event.y * self.current_image.shape[0] / 480)
        color = self.current_image[y, x]
        
        if len(self.base_colors) < 5:
            self.base_colors.append(color[::-1])  # BGR to RGB
            self.update_color_labels()
        else:
            self.target_color = color[::-1]
            self.update_target_label()

    def update_color_labels(self):
        for i, label in enumerate(self.color_labels):
            if i < len(self.base_colors):
                color = '#{:02x}{:02x}{:02x}'.format(*self.base_colors[i])
                label.configure(background=color)
            else:
                label.configure(background='white')

    def update_target_label(self):
        if self.target_color is not None:
            color = '#{:02x}{:02x}{:02x}'.format(*self.target_color)
            self.target_label.configure(background=color)

    def calculate_blend(self):
        if not (3 <= len(self.base_colors) <= 5) or self.target_color is None:
            return

        # Convert colors to CMYK
        base_cmyk = [self.rgb_to_cmyk(color) for color in self.base_colors]
        target_cmyk = self.rgb_to_cmyk(self.target_color)

        # Calculate optimal weights
        weights = self.calculate_weights(target_cmyk, base_cmyk)

        # Clear previous results
        for widget in self.results_frame.winfo_children():
            widget.destroy()

        # Show results
        ttk.Label(self.results_frame, text="Enter total volume/mass:").grid(row=0, column=0, pady=5)
        total_volume = ttk.Entry(self.results_frame)
        total_volume.grid(row=0, column=1, pady=5)

        def calculate_amounts():
            try:
                total = float(total_volume.get())
                for i, (color, weight) in enumerate(zip(self.base_colors, weights)):
                    amount = weight * total
                    color_hex = '#{:02x}{:02x}{:02x}'.format(*color)
                    ttk.Label(self.results_frame, text=f"Color {i+1}:", background=color_hex).grid(row=i+2, column=0)
                    ttk.Label(self.results_frame, text=f"{amount:.2f}").grid(row=i+2, column=1)
            except ValueError:
                pass

        ttk.Button(self.results_frame, text="Calculate Amounts", command=calculate_amounts).grid(row=1, column=0, columnspan=2, pady=5)

    def calculate_weights(self, target_color, base_colors):
        def loss_function(weights):
            combined_color = np.zeros(4)
            for w, color in zip(weights, base_colors):
                combined_color += w * np.array(color)
            return np.linalg.norm(combined_color - target_color)

        constraints = {'type': 'eq', 'fun': lambda w: np.sum(w) - 1}
        bounds = [(0, 1)] * len(base_colors)
        initial_weights = [1.0 / len(base_colors)] * len(base_colors)
        
        result = minimize(loss_function, initial_weights, bounds=bounds, constraints=constraints)
        return result.x

    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = ColorBlender()
    app.run()
