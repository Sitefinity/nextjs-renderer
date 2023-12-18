export interface EditorMetadata {
    Title?: string;
    Name?: string;
    EmptyIconText?: string;
    EmptyIconAction?: 'Edit' | 'None';
    EmptyIcon?: string;
    ThumbnailUrl?: string;
    Category?: 'Content' | 'Layout & Presets' | 'Navigation & Search' | 'Login & Users';
    Section?: string;
    Toolbox?: string;
    Warning?: string;
    HideEmptyVisual?: boolean;
    Order?: number;
}
