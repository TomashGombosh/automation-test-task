export interface ApplicationPage {
  open(): Promise<void>;

  getUrl(): string;
}
