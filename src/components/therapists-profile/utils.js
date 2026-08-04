import moment from "moment";

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0]?.substring(0, 2).toUpperCase() || "";
};

export const getTherapistStatus = (therapist) => {
  if (
    therapist?.isActive === true
  ) {
    return "active";
  }
  return "inactive";
};

export const getTherapistRole = (therapist) =>
  therapist?.designation ||
  therapist?.role ||
  therapist?.job_title ||
  therapist?.employee_type ||
  "Therapist";

export const getTherapistLocation = (therapist, spaLocation) => {
  if (therapist?.location) {
    return therapist.location;
  }
  if (therapist?.address) {
    return therapist.address;
  }
  if (therapist?.city && therapist?.state) {
    const street = therapist?.street ? `${therapist.street}, ` : "";
    return `${street}${therapist.city}, ${therapist.state}`;
  }
  if (therapist?.city) {
    return therapist.city;
  }
  return spaLocation || "-";
};

export const formatBirthday = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("MMMM D, YYYY") : value;
};

export const formatGender = (value) => {
  if (!value) return "-";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatServiceDuration = (service) => {
  const minutes = service?.hour * 60 + (service?.minutes || 0);
  return `${minutes}min`;
};

export const formatServicePrice = (price) => {
  const amount = Number(price || 0);
  return `$${amount.toFixed(2)}`;
};

export const formatServicePriceWithOutDesimalPoint = (price) => {
  const amount = Number(price || 0);
  return `$${amount}`;
};
