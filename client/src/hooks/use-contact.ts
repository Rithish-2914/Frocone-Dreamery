import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { CreateContactRequest, ContactResponse } from "@shared/schema";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: CreateContactRequest) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid contact details");
        }
        throw new Error("Failed to send message");
      }
      
      return await res.json() as ContactResponse;
    },
  });
}
