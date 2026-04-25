export function rejectRequest(requestId: string) {
  return { requestId, approved: false };
}
