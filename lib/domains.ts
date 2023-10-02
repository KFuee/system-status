import {
  DomainConfigResponse,
  DomainResponse,
  DomainVerificationResponse,
} from "./types";

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
);

export const addDomainToVercel = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains`,
    {
      body: `{\n  "name": "${domain}"\n}`,
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).then(async (res) => {
    const json = await res.json();
    if (!json.error) return json;

    throw new Error(json.error.message);
  });
};

export const removeDomainFromVercelProject = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: "DELETE",
    }
  ).then(async (res) => {
    const json = await res.json();
    if (!json.error) return json;

    throw new Error(json.error.message);
  });
};

export const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

export const getDomainResponse = async (
  domain: string
): Promise<DomainResponse & { error: { code: string; message: string } }> => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });
};

export const getConfigResponse = async (
  domain: string
): Promise<DomainConfigResponse> => {
  return await fetch(`https://api.vercel.com/v6/domains/${domain}/config`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const verifyDomain = async (
  domain: string
): Promise<DomainVerificationResponse> => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}/verify`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
};
