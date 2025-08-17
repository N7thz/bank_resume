import { BalanceWithSpent } from "@/@types"
import { Section, Img, Text, Heading, Button } from "@react-email/components"

interface EmailTemplateProps {
    balance: Omit<BalanceWithSpent, "_count"> 
}

export function EmailTemplate({ balance }: EmailTemplateProps) {
    return (
        <Section className="my-[16px]">
            <Img
                alt="Herman Miller Chair"
                className="w-full rounded-[12px] object-cover"
                height="320"
                src="https://react.email/static/herman-miller-chair.jpg"
            />
            <Section className="mt-[32px] text-center">
                <Text className="my-[16px] font-semibold text-[18px] text-indigo-600 leading-[28px]">
                    Our new article
                </Text>
                <Heading
                    as="h1"
                    className="m-0 mt-[8px] font-semibold text-[36px] text-gray-900 leading-[36px]"
                >
                    Designing with Furniture
                </Heading>
                <Text className="text-[16px] text-gray-500 leading-[24px]">
                    Unleash your inner designer as we explore how furniture plays a vital
                    role in creating stunning interiors, offering insights into choosing the
                    right pieces, arranging them harmoniously, and infusing your space with
                    personality.
                </Text>
                <Button
                    href="https://react.email"
                    className="mt-[16px] rounded-[8px] bg-indigo-600 px-[40px] py-[12px] font-semibold text-white"
                >
                    Read more
                </Button>
            </Section>
        </Section>
    )
}