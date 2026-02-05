
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
            <div className="space-y-6 max-w-md mx-auto">
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
                        <FileQuestion className="h-12 w-12 text-destructive" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                    <p className="text-sm font-mono bg-muted p-2 rounded inline-block mt-2">
                        {location.pathname}
                    </p>
                </div>

                <div className="pt-4">
                    <Link to="/">
                        <Button size="lg" className="gap-2">
                            <Home className="h-4 w-4" />
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
