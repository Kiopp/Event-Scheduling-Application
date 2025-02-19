variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "DESAP"
}

variable "location" {
  description = "Azure region for the resources"
  type        = string
  default     = "Sweden"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "Bombaclat"
}
