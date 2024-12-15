import PodGraph from "./PodGraph";

export default function Cpu({ namespaces }) {
    return (
        <PodGraph
            namespaces={namespaces}
            datatype="cpu"
        />
    );
}