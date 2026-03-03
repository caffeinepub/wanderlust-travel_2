import { useQuery } from "@tanstack/react-query";
import type { Inquiry } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["allInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminSubscriberCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["adminSubscriberCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSubscriberCount();
    },
    enabled: !!actor && !isFetching,
  });
}
