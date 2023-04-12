import type { App } from "vue";
import Crud from "./crud";
import Form from "./form";
import Table from "./table";
import Upsert from "./upsert";
import Dialog from "./dialog";
import Row from "./row";

export const components: { [key: string]: any } = {
  Crud,
  Form,
  Table,
  Upsert,
  Dialog,
  Row
};

export function useComponent(app: App) {
  for (const i in components) {
    app.component(components[i].name, components[i]);
  }
}