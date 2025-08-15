import {
    Pagination as PaginationRoot,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { DashboardClientProps } from "./dashboard-client"
import { format as formatDate } from "date-fns"
import { ptBR, tr } from "date-fns/locale"
import { Button } from "./ui/button"
import { useIsLastMonth } from "@/hooks/use-is-last-month"

type PaginationProps = DashboardClientProps & {
    defaultHref?: URL
}

export const Pagination = ({
    data: { month, year, type }
}: PaginationProps) => {

    const isLastMonth = useIsLastMonth({ month, year })

    console.log(isLastMonth)

    function onPaginationNext() {

        if (month < 11 && !isLastMonth) {
            return `/dashboard?type=${type}&year=${year}&month=${month + 1}`
        }

        if (month === 11) {
            return `/dashboard?type=${type}&year=${year + 1}&month=0`
        }

        return `/dashboard?type=${type}&year=${year}&month=${month}`
    }

    function onPaginationPrevious() {

        if (month === 0) {
            return `/dashboard?type=${type}&year=${year - 1}&month=11`
        }

        return `/dashboard?type=${type}&year=${year}&month=${month - 1}`
    }

    const dateFormated = formatDate(
        new Date(year, month, 1),
        "MMM - yyyy",
        { locale: ptBR }
    )

    return (
        <PaginationRoot>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={onPaginationPrevious()}>
                        Anterior
                    </PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant={"link"}
                        className="w-full p-2 capitalize cursor-default"
                    >
                        {dateFormated}
                    </Button>
                </PaginationItem>
                {
                    !isLastMonth &&
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href={onPaginationNext()}>
                                Próximo
                            </PaginationNext>
                        </PaginationItem>
                    </>
                }
            </PaginationContent>
        </PaginationRoot>
    )
}