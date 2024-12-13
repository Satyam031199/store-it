import Card from "@/app/components/Card";
import Sort from "@/app/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { Models } from "node-appwrite";

const page = async ({searchParams, params}: SearchParamProps) => {
    const type = ((await params)).type as string || '';                     // localhost:3000/images - type - images
    const searchText = ((await searchParams)?.query) as string || '';       // localhost:3000/images?query=sign&sort=latest - query - sign
    const sort = ((await searchParams)?.sort) as string || '';              // localhost:3000/images?query=sign&sort=latest - sort - latest
    const types = getFileTypesParams(type) as FileType[];
    const files = await getFiles({types, searchText, sort});
  return (
    <div className="page-container">
        <section className="w-full">
            <h1 className="h1 capitalize">{type}</h1>
            <div className="total-size-section">
                <p className="body-1">
                    Total: <span className="h5">0 MB</span>
                </p>
                <div className="sort-container">
                    <p className="body-1 hidden sm:block text-light-200">Sort by: </p>
                    <Sort />
                </div>
            </div>
        </section>
        {/* Render the files */}
        {files.total > 0 ? (
            <section className="file-list">
                {files.documents.map((file: Models.Document) => (
                    <Card key={file.$id} file={file}/>
                )
                )}
            </section>
        ): (
            <p className="empty-list">No files uploaded</p>
        )}
    </div>
  )
}

export default page