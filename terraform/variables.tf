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

variable "aks_cluster_name" {
  description = "AKS cluster name"
  type        = string
  default     = "Clusterfuck"
}

variable "node_count" {
  description = "Number of nodes in the AKS node pool"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "VM size for the AKS nodes"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type        = string
  default     = "Bombaclat"
}
