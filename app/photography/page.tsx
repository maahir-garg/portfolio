import { PhotoGallery } from "@/components/photography/PhotoGallery";
import { Container } from "@/components/ui/Container";

export const metadata = {
    title: "Photography | Maahir Garg",
    description: "A collection of moments captured in time.",
};

export default function PhotographyPage() {
    return (
        <div className="min-h-screen py-20 md:py-32">
            <Container>
                <div className="flex flex-col gap-12">
                    <div className="space-y-4 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Photography</h1>
                        <p className="text-primary/60 text-lg font-light leading-relaxed">
                            A visual diary of landscapes, streets, and people.
                        </p>
                    </div>

                    <PhotoGallery />
                </div>
            </Container>
        </div>
    );
}
