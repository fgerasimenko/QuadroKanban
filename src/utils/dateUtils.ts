export function formatDate(datestring: string) {
  const date = new Date(datestring);
  if (Number.isNaN(date.getTime())) { return datestring; }
  return date.toLocaleDateString();
}

export function dateToString(date: Date): string {
    return date.toLocaleDateString()
}

export function toDate(datestring: string): Date | null {
  if (!datestring) return null;
  const date = new Date(datestring);
  
  if (Number.isNaN(date.getTime())) { return null; }

  return date
}



