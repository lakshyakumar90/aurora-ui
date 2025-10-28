export type ControlBase = {
  id: string;
  label: string;
  description?: string;
};

export type ToggleControl = ControlBase & {
  type: "toggle";
  defaultValue?: boolean;
};

export type SliderControl = ControlBase & {
  type: "slider";
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
};

export type SelectControl = ControlBase & {
  type: "select";
  options: { label: string; value: string }[];
  defaultValue?: string;
};

export type Control = ToggleControl | SliderControl | SelectControl;

export type ExampleConfig = {
  component: React.ReactElement;
  filePath: string;
};


