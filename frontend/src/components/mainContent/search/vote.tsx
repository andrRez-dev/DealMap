import { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { getRequestHeaders, readResponse } from "../../shared/api";

type VoteResponse = {
  message: string;
  vote: VoteValue;
  votes: {
    works: number;
    expired: number;
  };
  is_active: boolean;
};

type VoteProps = {
  offerId: string;
  myVote: VoteValue | null;
  worksVotes: number;
  expiredVotes: number;
};

type VoteValue = "works" | "expired";

export default function Vote({
  offerId,
  myVote,
  worksVotes,
  expiredVotes,
}: VoteProps) {
  const [vote, setVote] = useState<VoteResponse>();
  const [submittedVote, setSubmittedVote] = useState<VoteValue | null>(myVote);
  const [error, setError] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [worksCount, setWorksCount] = useState(worksVotes);
  const [expiredCount, setExpiredCunt] = useState(expiredVotes);

  function isVoteValue(value: unknown): value is VoteValue {
    return value === "works" || value === "expired";
  }

  async function submitVote(offerStatus: VoteValue): Promise<void> {
    const api = import.meta.env.VITE_API_URL;

    if (!api) {
      setError("The API URL is not configured.");
      return;
    }

    // if (isSubmitting) {
    //   return;
    // }

    setError("");
    // setIsSubmitting(true);

    try {
      const response = await fetch(`${api}/api/offers/${offerId}/votes`, {
        method: "POST",
        headers: getRequestHeaders(),
        body: JSON.stringify({ vote: offerStatus }),
      });

      const data = await readResponse<VoteResponse>(
        response,
        "Unable to make a vote",
      );

      if (!isVoteValue(data.vote)) {
        throw new Error("The server returned an invalid vote.");
      }

      setVote(data);
      setSubmittedVote(data.vote);
      setWorksCount(data.votes.works);
      setExpiredCunt(data.votes.expired);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unable to make a vote",
      );
    }
    // finally {
    //   setIsSubmitting(false);
    // }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-[#edf0eb] pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#26332a]">
          Community feedback
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={` ${worksCount > expiredCount ? " bg-[#edf4eb] text-green-800" : "bg-gray-200  text-[#68766c]"} inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium `}
          >
            <ThumbsUp aria-hidden="true" className="h-3.5 w-3.5" />
            Actual
            <span>{worksCount}</span>
          </span>

          <span
            className={` ${expiredCount > worksCount ? "bg-[#fbefed] text-[#9b3c32]" : "bg-gray-200 text-[#68766c]"} inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium`}
          >
            <ThumbsDown aria-hidden="true" className="h-3.5 w-3.5" />
            Expired
            <span>{expiredCount}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        <div className="flex gap-2">
          <button
            type="button"
            // disabled={isSubmitting}
            className={` ${submittedVote === "works" ? "bg-[#edf4eb]" : "bg-white"} inline-flex items-center gap-2 rounded-xl border border-[#cfe3d0] px-3.5 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-[#edf4eb] disabled:cursor-wait disabled:opacity-60`}
            onClick={() => void submitVote("works")}
          >
            <ThumbsUp aria-hidden="true" className="h-4 w-4" />
            <p>Actual</p>
          </button>
          <button
            type="button"
            // disabled={isSubmitting}
            className={` ${submittedVote === "expired" ? "bg-[#fbefed]" : "bg-white"} inline-flex items-center gap-2 rounded-xl border border-[#ead8d5] px-3.5 py-2 text-sm font-semibold text-[#9b3c32] transition-colors hover:bg-[#fbefed] disabled:cursor-wait disabled:opacity-60`}
            onClick={() => void submitVote("expired")}
          >
            <ThumbsDown aria-hidden="true" className="h-4 w-4" />
            <p>Expired</p>
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-700" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
