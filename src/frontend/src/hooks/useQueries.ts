import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubscriberCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["subscriberCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSubscriberCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribeMutation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("No actor available");
      return actor.subscribe(email);
    },
  });
}

export function useSubmitInquiryMutation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      email: string;
      packageName: string;
      travelDate: string;
      numTravelers: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.submitInquiry(
        params.name,
        params.email,
        params.packageName,
        params.travelDate,
        params.numTravelers,
        params.message,
      );
    },
  });
}

export function useSearchDestination() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (term: string) => {
      if (!actor) return BigInt(0);
      return actor.searchDestination(term);
    },
  });
}
