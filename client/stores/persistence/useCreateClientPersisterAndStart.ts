import * as UiReact from "tinybase/ui-react/with-schemas";
import {
  Content,
  MergeableStore,
  OptionalSchemas,
} from "tinybase/with-schemas";
import { createClientPersister } from "./createClientPersister";

export const useCreateClientPersisterAndStart = <
  Schemas extends OptionalSchemas
>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string,
  then?: () => void
) =>
  (UiReact as UiReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    // @ts-ignore
    (store: MergeableStore<Schemas>) => createClientPersister(storeId, store),
    [storeId],
    async (persister) => {
      let initialContent: Content<Schemas> | undefined = undefined;
      try {
        initialContent = JSON.parse(initialContentJson ?? "{}");
      } catch {}

      await persister.load(initialContent);
      await persister.startAutoSave();
      then?.();
    },
    [initialContentJson]
  );
