import { PhotoScatteredView } from "@/components/photography/PhotoScatteredView";

export const metadata = {
    title: "Photography | Maahir Garg",
    description: "A collection of moments captured in time.",
};

export default function PhotographyPage() {
    return (
        <div className="bg-[#1a1a1a] min-h-screen text-white">
            <div className="pt-24 pb-8 px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Photography</h1>
                <p className="text-white/60 max-w-xl text-lg font-light leading-relaxed">
                    A visual diary of landscapes, streets, and people. <br />
                    Scatter the memories to explore.
                </p>
            </div>

            <PhotoScatteredView />
        </div>
    );
}
