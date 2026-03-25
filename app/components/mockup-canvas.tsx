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
  /** Canvas background color. When set, shows a solid color instead of the checkered pattern. null/undefined = checkered (transparent). */
  backgroundColor?: string | null;
  /** Additional className for the outer wrapper */
  className?: string;
}

const MockupCanvas = forwardRef<HTMLDivElement, MockupCanvasProps>(
  function MockupCanvas({ children, position = "center", backgroundColor, className = "" }, ref) {
    const hasBg = backgroundColor != null && backgroundColor !== "";

    return (
      <div
        ref={ref}
        className={`relative aspect-square w-full rounded-2xl shadow-lg overflow-hidden ${className}`}
      >
        {/* Background layer: solid color when set, checkered pattern when transparent */}
        <div
          data-canvas-bg
          className="absolute inset-0"
          style={
            hasBg
              ? {
                  backgroundColor,
                  transition: "background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1)",
                }
              : {
                  backgroundImage: [
                    "linear-gradient(45deg, #e5e5e5 25%, transparent 25%)",
                    "linear-gradient(-45deg, #e5e5e5 25%, transparent 25%)",
                    "linear-gradient(45deg, transparent 75%, #e5e5e5 75%)",
                    "linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)",
                  ].join(", "),
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0px 0px, 0px 10px, 10px -10px, -10px 0px",
                  transition: "background-color 200ms cubic-bezier(0.645, 0.045, 0.355, 1)",
                }
          }
        />

        {/* Device layer — position controlled by prop, padded top/bottom */}
        <div
          className={`absolute inset-0 overflow-hidden flex justify-center ${POSITION_ALIGN[position]}`}
          style={{
            paddingTop: "8%",
            paddingBottom: "8%",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default MockupCanvas;
