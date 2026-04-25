import { create } from "zustand";
import type { ApprovalRequest } from "@/features/agent/approvals/types/approval-types";

type ApprovalStore = {
  pendingRequest: ApprovalRequest | null;
  setPendingRequest: (request: ApprovalRequest | null) => void;
};

export const useApprovalStore = create<ApprovalStore>((set) => ({
  pendingRequest: null,
  setPendingRequest: (pendingRequest) => set({ pendingRequest }),
}));
