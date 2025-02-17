const ACCEPTED_EXTENSIONS = ["webp", "jpeg", "png"]

export function makeGalleryMultipart(images: FileList): [FormData, Error[]] {
        const form = new FormData()
        const errors: Error[] = []

        for (const f of images) {
                if (!ACCEPTED_EXTENSIONS.includes(f.type.substring(6))) {
                        errors.push(new Error(`Non-acceptable mimetype provided: "${f.type}" for file "${f.name}"`))
                        continue
                }

                form.append("files[]", new Blob([f], { type: f.type}))
        }

        return [form, errors]
}



