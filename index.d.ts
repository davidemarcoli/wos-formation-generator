// Declare the global interface for the window object
declare global {
    interface Window {
        umami: {
            track: (event: string, data?: Record<string, unknown>) => void;
        };
    }
}

export {}