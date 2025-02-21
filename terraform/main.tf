# Create the Resource Group in Sweden Central
resource "azurerm_resource_group" "rg" {
  name     = "DESAP"
  location = "Sweden Central"
}

# Look up the three users by their User Principal Names (UPNs)
data "azuread_user" "noca22tf" {
  user_principal_name = "noca22tf@student.ju.se"
}

data "azuread_user" "beax22tr" {
  user_principal_name = "beax22tr@student.ju.se"
}

data "azuread_user" "weje22wy" {
  user_principal_name = "weje22wy@student.ju.se"
}

# Assign the Owner role (highest privilege) to each user on the Resource Group
resource "azurerm_role_assignment" "noca22tf_assignment" {
  scope                = azurerm_resource_group.rg.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.noca22tf.object_id
}

resource "azurerm_role_assignment" "beax22tr_assignment" {
  scope                = azurerm_resource_group.rg.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.beax22tr.object_id
}

resource "azurerm_role_assignment" "weje22wy_assignment" {
  scope                = azurerm_resource_group.rg.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.weje22wy.object_id
}

# Create the Container Repository (Azure Container Registry) in the Resource Group
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_kubernetes_cluster" "akc" {
  name                = var.app_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = var.app_name
  kubernetes_version  = var.kubernetes_version

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s"
  }

  # Instead of creating a service principle have the system figure this out.

  identity {
    type = "SystemAssigned"
  }

