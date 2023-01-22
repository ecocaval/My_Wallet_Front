import { FallingLines } from "react-loader-spinner";

export default function DeletingLoader() {
    return (
        <FallingLines
            color="#9254BE"
            width="18"
            visible={true}
            ariaLabel='falling-lines-loading'
        />
    )
}