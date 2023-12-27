import { formattedNumber } from "@/utils/common";
import Card from "../card";


const AvenueCard = (props) => {
    const { title } = props;
    let { value } = props;
    value = formattedNumber(value);

    return (
        <Card extra="!p-[20px]">
            <div className="flex">
                {title && <h3 className="text-xl font-bold text-black">{title}</h3>}
            </div>

            <div className="flex justify-end mt-4">
                {value && <h2 className="text-3xl text-black">{title != "Total Goals Progress" ? "$ " + value : value + "%"}</h2>}
            </div>
        </Card>
    );
}

export default AvenueCard;
