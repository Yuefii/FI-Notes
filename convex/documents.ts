import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values"


// export const get = query({
//     handler: async (ctx) => {
//         const identity = await ctx.auth.getUserIdentity()
//         if (!identity) {
//             throw new Error("user not authenticated")
//         }
//         const document = await ctx.db.query("documents").collect()
//         return document
//     }
// })

export const archive = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("pengguna tidak diautentikasi")
        }
        const userId = identity.subject
        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Tidak Ditemukan")
        }

        if (existingDocument.userId !== userId) {
            throw new Error("pengguna tidak diautentikasi")
        }

        const recursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) => (
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ))
                .collect()

                for (const child of children) {
                    await ctx.db.patch(child._id, {
                        isArchived: true
                    })

                    await recursiveArchive(child._id)
                }
        }

        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        recursiveArchive(args.id)
        return document
    },
})

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("pengguna tidak diautentikasi")
        }
        const userId = identity.subject
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
                q
                    .eq("userId", userId)
                    .eq("parentDocument", args.parentDocument)
            )
            .filter((q) =>
                q.eq(q.field("isArchived"), false)
            )
            .collect()

        return documents
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("pengguna tidak diautentikasi")
        }

        const userId = identity.subject
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        })

        return document
    }
})