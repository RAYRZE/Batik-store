const DEFAULT_MESSAGE = "Terjadi kesalahan. Silakan coba lagi.";
const TIMEOUT_MESSAGE = "Waktu permintaan habis. Periksa koneksi Anda dan coba lagi.";
const NETWORK_MESSAGE = "Koneksi gagal. Periksa koneksi internet Anda.";
const NOT_FOUND_MESSAGE = "Data tidak ditemukan.";

export function getErrorMessage(
  error,
  fallback = DEFAULT_MESSAGE,
  notFoundMessage = NOT_FOUND_MESSAGE,
) {
  if (!error) return fallback;

  if (error.name === "TimeoutError") return TIMEOUT_MESSAGE;
  if (error.name === "NetworkError") return NETWORK_MESSAGE;
  if (error.name === "ApiError" && error.status === 404) return notFoundMessage;

  return error.message || fallback;
}
