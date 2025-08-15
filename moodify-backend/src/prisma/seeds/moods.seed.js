"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function seedMoods(prisma) {
    return __awaiter(this, void 0, void 0, function () {
        var moods, _i, moods_1, mood;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    moods = [
                        {
                            name: 'Chill',
                            slug: 'chill',
                            description: 'Warm, laid-back, and unobtrusive.',
                            audioTargets: { valence: 0.55, energy: 0.35, danceability: 0.55, acousticness: 0.5, tempo: { min: 80, max: 110 } },
                        },
                        {
                            name: 'Energetic',
                            slug: 'energetic',
                            description: 'High-energy, feel-good songs.',
                            audioTargets: { valence: 0.75, energy: 0.8, danceability: 0.75, acousticness: 0.15, tempo: { min: 110, max: 140 } },
                        },
                        {
                            name: 'Melancholic',
                            slug: 'melancholic',
                            description: 'Tender, introspective, and emotional.',
                            audioTargets: { valence: 0.25, energy: 0.35, danceability: 0.4, acousticness: 0.55, tempo: { min: 70, max: 100 } },
                        },
                        {
                            name: 'Happy',
                            slug: 'happy',
                            description: 'Bright and uplifting tunes.',
                            audioTargets: { valence: 0.8, energy: 0.7, danceability: 0.65, acousticness: 0.2, tempo: { min: 100, max: 130 } },
                        },
                        {
                            name: 'Sad',
                            slug: 'sad',
                            description: 'Reflective and somber tracks.',
                            audioTargets: { valence: 0.2, energy: 0.3, danceability: 0.3, acousticness: 0.6, tempo: { min: 60, max: 90 } },
                        },
                        {
                            name: 'Romantic',
                            slug: 'romantic',
                            description: 'Soft and intimate melodies perfect for a romantic setting.',
                            audioTargets: { valence: 0.7, energy: 0.4, danceability: 0.5, acousticness: 0.7, tempo: { min: 70, max: 100 } },
                        },
                        {
                            name: 'Dramatic',
                            slug: 'dramatic',
                            description: 'Intense and powerful tracks.',
                            audioTargets: { valence: 0.6, energy: 0.8, danceability: 0.4, acousticness: 0.3, tempo: { min: 90, max: 130 } },
                        },
                        {
                            name: 'Euphoric',
                            slug: 'euphoric',
                            description: 'Uplifting and feel-good tracks.',
                            audioTargets: { valence: 0.9, energy: 0.8, danceability: 0.7, acousticness: 0.2, tempo: { min: 120, max: 150 } },
                        },
                    ];
                    _i = 0, moods_1 = moods;
                    _a.label = 1;
                case 1:
                    if (!(_i < moods_1.length)) return [3 /*break*/, 4];
                    mood = moods_1[_i];
                    return [4 /*yield*/, prisma.mood.createMany({
                            data: mood,
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = seedMoods;
