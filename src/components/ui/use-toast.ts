import { useToast as useBaseToast, toast as baseToast } from "@/hooks/use-toast";

export const useToast = useBaseToast;

export const toast = (props: any = {}) =>
  baseToast({ ...props, duration: props?.duration ?? 3500 });
