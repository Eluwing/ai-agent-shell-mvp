import type { ApprovalRiskLevel } from "@/features/agent/approvals/types/approval-types";

export function formatApprovalRisk(riskLevel: ApprovalRiskLevel) {
  return riskLevel.toUpperCase();
}
