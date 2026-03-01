"use client";

import { forwardRef } from "react";

/**
 * MockupCanvas — the square preview area that holds a device mockup.
 *
 * Renders a 1:1 aspect-ratio container with:
 *   - Checkered transparency pattern background
 *   - Rounded corners and card shadow
 *   - Overflow hidden so zoomed-in devices crop naturally
 *   - Children (the device) centered inside
 */

export type CanvasPosition = "top" | "center" | "bottom";

const POSITION_ALIGN: Record<CanvasPosition, string> = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

interface MockupCanvasProps {
  children: React.ReactNode;
  /** Vertical position of the device within the canvas. Default: "center" */
  position?: CanvasPosition;
  /** Additional className for the outer wrapper */
  className?: string;
}

const MockupCanvas = forwardRef<HTMLDivElement, MockupCanvasProps>(
  function MockupCanvas({ children, position = "center", className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`relative aspect-square w-full rounded-3xl shadow-lg overflow-hidden ${className}`}
      >
        {/* Checkered transparency pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(45deg, #e5e5e5 25%, transparent 25%)",
              "linear-gradient(-45deg, #e5e5e5 25%, transparent 25%)",
              "linear-gradient(45deg, transparent 75%, #e5e5e5 75%)",
              "linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)",
            ].join(", "),
            backgroundSize: "20px 20px",
            backgroundPosition: "0px 0px, 0px 10px, 10px -10px, -10px 0px",
          }}
        />

        {/* Device layer — position controlled by prop, padded from edges */}
        <div
          className={`absolute overflow-hidden flex justify-center ${POSITION_ALIGN[position]}`}
          style={{
            top: "8%",
            bottom: "8%",
            left: 0,
            right: 0,
            transition: "align-items 0.3s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default MockupCanvas;
