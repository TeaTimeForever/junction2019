// @ts-ignore
import otf from "./*.otf";
// @ts-ignore
import ttf from "./*.ttf";

const files = Object.assign({}, ttf, otf);

declare class FontFace {
    constructor(name: string, url: string, options: any);
    public load(): void;
}

interface IFontVariation {
    url: string;
    weight: number;
}

interface IFont {
    name: string;
    variations: IFontVariation[];
    format: string;
}

export const fonts: IFont[] = [
    {
        format: "truetype",
        name: "Avenir",
        variations: [
            {
                url: files["Avenir-Black-03"],
                weight: 900,
            }, {
                url: files["Avenir-Book-01"],
                weight: 400,
            }, {
                url: files["Avenir-Heavy-05"],
                weight: 800,
            }, {
                url: files["Avenir-Medium-09"],
                weight: 500,
            },
        ],
    }, {
        format: "opentype",
        name: "Source Code Pro",
        variations: [
            {
                url: files["SourceCodePro-Semibold"],
                weight: 600,
            },
        ],
    },
];

export const load = Promise.all(
    fonts.flatMap(({ name, variations, format }) => variations.map(async ({ url, weight }) => {
        const font = new FontFace(name, `url(${url}) format('${format}')`, { weight });
        await font.load();
        (document as any).fonts.add(font);
    })),
);
