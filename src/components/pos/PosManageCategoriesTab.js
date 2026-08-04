"use client";

import React, { useCallback, useState } from "react";
import AddCategoryModal from "@/components/pos/AddCategoryModal";
import DeleteCategoryModal from "@/components/pos/DeleteCategoryModal";
import ManageCategoriesModal from "@/components/pos/ManageCategoriesModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function PosManageCategoriesTab({
  show,
  categories = [],
  onHide,
  onCategoriesChange,
}) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toaster } = useToaster();

  const handleOpenAddCategory = () => {
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  const handleCategoriesLoaded = useCallback(
    (list) => {
      onCategoriesChange?.(list);
    },
    [onCategoriesChange]
  );

  const handleCategorySave = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleUpdateCategory = (category) => {
    onCategoriesChange?.((prev) =>
      prev.map((item) => (item.id === category.id ? { ...item, ...category } : item))
    );
  };

  const handleDeleteCategoryClick = (category) => {
    setDeletingCategory(category);
    setShowDeleteCategoryModal(true);
  };

  const handleCloseDeleteCategoryModal = () => {
    if (deleting) return;
    setShowDeleteCategoryModal(false);
    setDeletingCategory(null);
  };

  const handleConfirmDeleteCategory = async () => {
    if (!deletingCategory?.id) {
      handleCloseDeleteCategoryModal();
      return;
    }

    try {
      setDeleting(true);
      const res = await axiosApiCall.delete(
        `${API_ROUTER?.POS_CATEGORY_DELETE}/${deletingCategory.id}`
      );

      if (!res?.data?.status) {
       return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      onCategoriesChange?.((prev) =>
        prev.filter((item) => item.id !== deletingCategory.id)
      );
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      setShowDeleteCategoryModal(false);
      setDeletingCategory(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <ManageCategoriesModal
        show={show}
        categories={categories}
        refreshKey={refreshKey}
        onHide={onHide}
        onAddCategory={handleOpenAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategoryClick}
        onCategoriesLoaded={handleCategoriesLoaded}
      />

      <AddCategoryModal
        show={showCategoryModal}
        category={null}
        onHide={handleCloseCategoryModal}
        onSuccess={handleCategorySave}
      />

      <DeleteCategoryModal
        show={showDeleteCategoryModal}
        categoryName={deletingCategory?.name || ""}
        deleting={deleting}
        onHide={handleCloseDeleteCategoryModal}
        onConfirm={handleConfirmDeleteCategory}
      />
    </>
  );
}
