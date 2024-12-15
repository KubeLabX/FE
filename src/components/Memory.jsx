import PodGraph from "./PodGraph";

export default function Memory({ namespaces }) {
    return (
        <PodGraph
            namespaces={namespaces}
            datatype="cpu"
        />
    );
}