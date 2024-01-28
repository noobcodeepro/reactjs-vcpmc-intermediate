export function splitFullName(fullName: string): {
  lastName: string;
  firstName: string;
  middleName?: string;
} {
  const parts = fullName.split(' ');

  if (parts.length === 1) {
    return { lastName: '', firstName: parts[0] };
  } else if (parts.length === 2) {
    return { lastName: parts[0], firstName: parts[1] };
  } else {
    // Gộp phần middleName với phần lastName
    const lastName = parts[0] + (parts.length > 3 ? ' ' : '') + parts.slice(1, -1).join(' ');
    const firstName = parts[parts.length - 1];

    return { lastName, firstName };
  }
}
