import { ReactNode } from "react";

export type AnyJson = any;

export type renderObjectFunction = (
  json: AnyJson,
  path: string[]
) => JSX.Element[];

export interface JSONEditorProps {
  json: AnyJson;
  setJson: React.Dispatch<React.SetStateAction<AnyJson>>;
}

export interface KeyProps {
  jsonKey: string;
  path: string[];
  handleKey(path: string[], newKey: string): void;
}

export interface ValueProps {
  value: AnyJson;
  path: string[];
  handleValue(path: (string | number)[], newValue: string): void;
  getValue(path: string[]): string;
}

export interface RowProps {
  jsonKey: string;
  value: AnyJson;
  renderObject(json: AnyJson, path: string[]): ReactNode;
  path: string[];
  handleValue(path: string[], newValue: string): void;
  handleKey(path: string[], newKey: string): void;
  getValue(path: string[]): string;
}
