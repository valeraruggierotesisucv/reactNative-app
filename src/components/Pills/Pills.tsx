import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export interface Category {
    id: string;
    label: string;
}

interface PillsProps {
    categories: Category[];
    onSelectCategories?: (categoryIds: string[]) => void;
    selectedCategories?: string[];
}

export function Pills({ categories, onSelectCategories, selectedCategories = [] }: PillsProps) {
    const [selected, setSelected] = useState<string[]>(selectedCategories);

    const handlePress = (categoryId: string) => {
        const newSelected = selected.includes(categoryId)
            ? selected.filter(id => id !== categoryId) // Remove if already selected
            : [...selected, categoryId]; // Add if not selected
        
        setSelected(newSelected);
        onSelectCategories?.(newSelected);
    };

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.pill,
                        selected.includes(category.id) && styles.selectedPill,
                    ]}
                    onPress={() => handlePress(category.id)}
                >
                    <Text
                        style={[
                            styles.pillText,
                            selected.includes(category.id) && styles.selectedPillText,
                        ]}
                    >
                        {category.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedPill: {
        backgroundColor: '#1a237e',
        borderColor: '#1a237e',
    },
    pillText: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    selectedPillText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
