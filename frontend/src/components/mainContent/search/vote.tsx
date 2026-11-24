
import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isVoteValue(value: unknown): value is VoteValue {
    return value === "works" || value === "expired";
  }

  async function submitVote(offerStatus: VoteValue): Promise<void> {
    const api = import.meta.env.VITE_API_URL;

    if (!api) {
      setError("The API URL is not configured.");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setError("");
    setIsSubmitting(true);

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
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unable to make a vote",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 border-t border-[#edf0eb] pt-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Community feedback */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#26332a]">
          Community feedback
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#edf4eb] px-3 py-1.5 text-xs font-medium text-green-800">
            <ThumbsUp
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
            />
            Actual
            <span className="font-bold">
              {vote?.votes.works ?? worksVotes}
            </span>
          </span>

          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#f3f4f2] px-3 py-1.5 text-xs font-medium text-[#68766c]">
            <ThumbsDown
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
            />
            Expired
            <span className="font-bold">
              {vote?.votes.expired ?? expiredVotes}
            </span>
          </span>
        </div>
      </div>

      {/* Voting controls */}
      <div className="flex w-full min-w-0 flex-col gap-2 lg:w-auto lg:items-end">
        {submittedVote ? (
          <p
            className="max-w-full self-start break-words rounded-xl bg-[#edf4eb] px-3 py-2 text-xs font-medium text-green-800 lg:self-end"
            role="status"
          >
            You voted: {submittedVote === "works" ? "Actual" : "Expired"}
          </p>
        ) : (
          <div className="grid w-full min-w-0 grid-cols-1 gap-2 min-[360px]:grid-cols-2 lg:w-auto">
            <button
              type="button"
              disabled={isSubmitting}
              className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-[#cfe3d0] bg-white px-3 py-2.5 text-sm font-semibold text-green-800 transition-colors hover:bg-[#edf4eb] disabled:cursor-wait disabled:opacity-60"
              onClick={() => void submitVote("works")}
            >
              <ThumbsUp
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              />
              <span>{isSubmitting ? "Sending…" : "Actual"}</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-[#ead8d5] bg-white px-3 py-2.5 text-sm font-semibold text-[#9b3c32] transition-colors hover:bg-[#fbefed] disabled:cursor-wait disabled:opacity-60"
              onClick={() => void submitVote("expired")}
            >
              <ThumbsDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              />
              <span>{isSubmitting ? "Sending…" : "Expired"}</span>
            </button>
          </div>
        )}

        {error && (
          <p
            className="w-full min-w-0 break-words text-xs text-red-700 lg:max-w-xs"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
