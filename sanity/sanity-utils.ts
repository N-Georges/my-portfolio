import { createClient, groq } from "next-sanity";
import type * as Schema from "../types/schema";
import clientConfig from "./config/client-config";

type Project = Schema.Project;

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        github,
        "category": category->name,
        stack,
        "iconStack": iconStack[].asset->url,
        content,
    }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        github,
        "category": category->name,
        stack,
        "iconStack": iconStack[].asset->url,
        content,
    }`,
    { slug }
  );
}

export async function getCategories(): Promise<Schema.Category[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "category"] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
    }`
  );
}

export async function getGuestbook(): Promise<Schema.Guestbook[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "guestbook"] | order(_createdAt desc) {
        _id,
        name,
        message,
        _createdAt,
    }`
  );
}
