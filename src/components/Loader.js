import { FallingLines } from "react-loader-spinner";

export default function Loader() {
    return (
        <FallingLines
            color="#FFFFFF"
            width="100"
            visible={true}
            ariaLabel='falling-lines-loading'
        />
    )
}