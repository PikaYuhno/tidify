import { useQuery } from "react-query";
import { getMe } from "../api/auth";

export const useMe = () => useQuery('me', getMe, {
    staleTime: 1000 * 60 * 60 * 1// 1 hours
});