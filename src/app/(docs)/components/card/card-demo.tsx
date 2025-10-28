import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CardBasic = () => {
    return (
        <div className="max-w-md">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This is the card content. You can put any content here.</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardBasic;