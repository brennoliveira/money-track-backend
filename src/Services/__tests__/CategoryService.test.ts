import { CategoryDTO } from "../../Models/entities";
import { CategoryRepository } from "../../Repositories";
import { CategoryService } from "../CategoryService";

jest.mock("../../Repositories/CategoryRepository");

describe("CategoryService", () => {
    let categoryService: CategoryService;
    let mockCategoryRepository: jest.Mocked<CategoryRepository>;

    beforeEach(() => {
        mockCategoryRepository = new CategoryRepository() as jest.Mocked<CategoryRepository>;
        categoryService = new CategoryService();
        (categoryService as any).categoryRepository = mockCategoryRepository;
    });

    it("should create a new category", async () => {
        const mockCategory: CategoryDTO = {
            id: 1,
            name: "Food",
            userId: 123,
        };

        mockCategoryRepository.createCategory.mockResolvedValue(mockCategory);

        const result = await categoryService.createCategory("Food", 123);

        expect(result).toEqual(mockCategory);
        expect(mockCategoryRepository.createCategory).toHaveBeenCalledWith("Food", 123);
    });

    it("should return a category by ID and userId", async () => {
        const mockCategory: CategoryDTO = {
        id: 1,
        name: "Food",
        userId: 123,
        };

        mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);

        const result = await categoryService.findCategoryById(1, 123);

        expect(result).toEqual(mockCategory);
        expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(1, 123);
    });

    it("should throw an error if category is not found by ID", async () => {
        mockCategoryRepository.getCategoryById.mockResolvedValue(null);

        await expect(categoryService.findCategoryById(999, 123)).rejects.toThrow("Category not found");
    });

    it("should return all categories for a user", async () => {
        const mockCategories: CategoryDTO[] = [
        { id: 1, name: "Food", userId: 123 },
        { id: 2, name: "Transport", userId: 123 },
        ];

        mockCategoryRepository.getUserCategories.mockResolvedValue(mockCategories);

        const result = await categoryService.findCategoriesByUser(123);

        expect(result).toEqual(mockCategories);
        expect(mockCategoryRepository.getUserCategories).toHaveBeenCalledWith(123);
    });
});