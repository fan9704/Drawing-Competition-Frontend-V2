import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
import { ChallengeType } from "../types/challenges";
import { FakeRoundData } from "./fakeData";

export function useRoundQuery() {
    const roundDataQuery = useQuery<{
        id: string;
        start_time: Date;
        end_time: Date;
        challenges: ChallengeType[];
    }>({
        queryKey: ["roundData"],
        queryFn: () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(FakeRoundData);
                }, 1000);
            }),
        // queryFn:  () =>
        //     fetch(`${import.meta.env.VITE_API_URL}/challenge/`)
        //         .then(async (res) => {
        //             if (!res.ok) {
        //                 throw new Error(await res.text());
        //             }
        //             return res.json();
        //         })
        //         .catch((error) => {
        //             toast.error("無法取得題目資料，請找課活團隊求助！", {
        //                 description: error.message ?? error,
        //             });
        //             console.error(error);
        //         }),
    });
    return roundDataQuery;
}
