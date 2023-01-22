import { FallingLines } from "react-loader-spinner";

export default function Loader() {
    return (
        <section>
            <FallingLines
                color="#FFFFFF"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />
        </section>
    )
}