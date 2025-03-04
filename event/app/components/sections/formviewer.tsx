import RenderFormComponent from "@components/layouts/renderformcomponent";
import { EventContext } from "@contexts";
import { useContext } from "react";

export default function FormViewer() {
  const { form } = useContext(EventContext);
  return <>{form.map((val, index) => RenderFormComponent(val, index))}</>;
}
