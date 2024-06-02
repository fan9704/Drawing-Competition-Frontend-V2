import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import type { ChallengeType } from "../../types/challenges";
import { Link } from "react-router-dom";

export function ChallengeCard({ card }: { card: ChallengeType }) {
    return (
        <Link to={`/challenge/${card.id}`}>
            <Card className="py-4 bg-zinc-800 w-72 rounded-md">
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={`${import.meta.env.VITE_BACKEND_URL}${card.image_url}`}
                        width={288}
                    />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div className="flex gap-2 items-center">
                        <h4 className="font-bold text-large">{card.title}</h4>
                        <Chip
                            size="sm"
                            className={
                                card.difficulty === "easy"
                                    ? "bg-emerald-500"
                                    : card.difficulty === "medium"
                                      ? "bg-amber-500"
                                      : "bg-red-600"
                            }
                        >
                            {card.difficulty === "easy"
                                ? "簡單"
                                : card.difficulty === "medium"
                                  ? "中等"
                                  : "困難"}
                        </Chip>
                    </div>
                    <small className="text-default-500">
                        {card.description}
                    </small>
                </CardHeader>
            </Card>
        </Link>
    );
}
