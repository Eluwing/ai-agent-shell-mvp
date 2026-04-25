import { useApprovalStore } from "@/features/agent/approvals/stores/approval-store";

export function useApprovalRequest() {
  const pendingRequest = useApprovalStore((state) => state.pendingRequest);
  const setPendingRequest = useApprovalStore((state) => state.setPendingRequest);

  return {
    pendingRequest,
    setPendingRequest,
  };
}
